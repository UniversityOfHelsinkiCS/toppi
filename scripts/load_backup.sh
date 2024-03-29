#!/bin/bash
set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)
BACKUPS=$PROJECT_ROOT/backups/

# Get variables from .env file
export $(grep -v '^#' $PROJECT_ROOT/scripts/.env | xargs)

# Login to OC
oc login -u $USERNAME https://api.ocp-prod-0.k8s.it.helsinki.fi:6443

# Read db password from user
DB_PASSWORD=""
echo "Enter the possu database password \n(see https://version.helsinki.fi/toska/dokumentaatio/-/blob/master/passwords.md?ref_type=heads)"
read -s DB_PASSWORD

echo "Downloading backup from postgres://$DB_NAME:<PASSWORD>@possu-toska.it.helsinki.fi:5432/$APP_NAME..."

# Download backup
oc exec -it $(oc get pods -l deployment=db-tools -o jsonpath='{.items[0].metadata.name}') -- pg_dump postgres://$DB_NAME:$DB_PASSWORD@possu-toska.it.helsinki.fi:5432/$APP_NAME | gzip -c > $DB_NAME.sql.gz

echo "Done"
echo "Removing volume $VOLUME_NAME..."

# Remove and recreate the database, then load the backup
# Remove the volume (tolerate errors for this command)
docker-compose down
set +e
  docker volume rm $VOLUME_NAME
set -e

docker-compose up -d db

# Wait for the database to be ready
while ! docker-compose exec db pg_isready --dbname=$DB_NAME; do
  echo "Waiting for the database to be ready..."
  sleep 1
done

# Load the backup
docker exec -i $CONTAINER_NAME /bin/bash -c "gunzip | psql -U $LOCAL_DB_USER -d $LOCAL_DB_NAME" < $DB_NAME.sql.gz

echo "Backup loaded!"

# Remove the backup
rm $DB_NAME.sql.gz

# Print success
echo "Done"

# Start the app
docker-compose up
