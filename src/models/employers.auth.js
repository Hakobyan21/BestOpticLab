// NPM Modules
import { Model } from "objection";

class EmployersModel extends Model {
  static get idColumn() {
    return "id";
  }

  static get tableName() {
    return "employes";
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  static findByUsername(email) {
    return EmployersModel.query().findOne({ email });
  }

  static findByEmail(email) {
    return EmployersModel.query().findOne({ email });
  }
}

export default EmployersModel;
