# TOPPI [![Production](https://github.com/UniversityOfHelsinkiCS/toppi/actions/workflows/production.yml/badge.svg)](https://github.com/UniversityOfHelsinkiCS/toppi/actions/workflows/production.yml) [![Staging](https://github.com/UniversityOfHelsinkiCS/toppi/actions/workflows/staging.yml/badge.svg)](https://github.com/UniversityOfHelsinkiCS/toppi/actions/workflows/staging.yml)

Production @ https://toppi.ext.ocp-prod-0.k8s.it.helsinki.fi/

Työaika- ja palkkalaskuri ulkopuolisille tuntiopettajille.

## Configuration

Give extra role grants with `ADUSER_ROLE, FACULTY_ROLE, UNIVERSITY_ROLE, ADMIN_ROLE` env variables. Extra role grants will be merged with any other roles users get (such as those from Jami). Example:

```bash
$ export ADMIN_ROLE=topelias.toppinen@helsinki.fi;urho.kekkonen@suomi.fi
```

Set tester emails with `TESTER_EMAILS`. Contract requests sent with these emails will always have `isTest: true`. Example:

```bash
$ export TESTER_EMAILS=topi.testaaja@helsinki.fi;topelias.toppinen@helsinki.fi
```

## Maintainers <img src=./public/toska13.png width=100px />

[Toska](https://toska.dev), University of Helsinki

<img src=https://em-content.zobj.net/source/animated-noto-color-emoji/356/goat_1f410.gif width=240px alt="Happy goat of good fortune" />
