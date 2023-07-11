import { DataTypes } from 'sequelize'
import { Migration, sequelize } from '../connection'
import { ContractRequest } from '../models'

export const up: Migration = async ({ context: queryInterface }) => {
  await sequelize.transaction(async () => {
    try {
      await queryInterface.addColumn("contract_requests", "data", {
        type: DataTypes.JSONB,
        allowNull: true,
      })
    } catch (e) {
      console.log("contract_requests.data already seems to exist")
    }

    const [formDatas, ] = await queryInterface.sequelize.query(`
      SELECT id, form_data FROM contract_requests;
    `) as [{ id: number, form_data: object }[], unknown]

    const newFormDatas = formDatas.map(fd => ({ id: fd.id, data: { calculatorData: {}, formData: fd.form_data }}))

    await Promise.all(newFormDatas.map(async (d) => {
      const cr = await ContractRequest.findByPk(d.id)
      if (!cr) return
      cr.data = d.data
      await cr?.save()
    }))

    await queryInterface.removeColumn("contract_requests", "form_data")
  })
}

export const down: Migration = async () => {
  // no
}