import { Attributes, CreationAttributes } from "sequelize/types/model";
import { Class } from "../models/Class";
import { Fn, Col, Literal } from "sequelize/types/utils";
import { Student } from "../models/Student";

class ClassService {
  public createClass(values: CreationAttributes<Class>) {
    return Class.create(values);
  }

  public getAllClasses() {
    return Class.findAll();
  }

  public getClassById(id: number) {
    return Class.findByPk(id);
  }

  public getClassWithStudents(id: number) {
    return Class.findByPk(id, { include: [Student] });
  }

  public async updateClass(
    id: number,
    values: {
      [key in keyof Attributes<Class>]?:
        | Attributes<Class>[key]
        | Fn
        | Col
        | Literal;
    }
  ) {
    const [rowsUpdated] = await Class.update(values, { where: { id } });
    return rowsUpdated === 1;
  }

  public async deleteClass(id: number) {
    const rowsDeleted = await Class.destroy({ where: { id } });
    return rowsDeleted === 1;
  }
}

export default new ClassService();
