import { Attributes, CreationAttributes } from "sequelize/types/model";
import { Account } from "../models/Account";
import { Fn, Col, Literal } from "sequelize/types/utils";

class AccountService {
  public async createAccount(
    accountData: CreationAttributes<Account>
  ): Promise<Account> {
    try {
      const account = await Account.create({...accountData, password: "hashedPassword"});
      return account;
    } catch (error) {
      throw new Error("Failed to create account");
    }
  }

  public async getAccountById(accountId: number): Promise<Account | null> {
    try {
      const account = await Account.findByPk(accountId);
      return account;
    } catch (error) {
      throw new Error("Failed to get account");
    }
  }

  public async updateAccount(
    accountId: number,
    accountData: {
      [key in keyof Attributes<Account>]?:
        | Attributes<Account>[key]
        | Fn
        | Col
        | Literal;
    }
  ): Promise<[affectedCount: number]> {
    try {
      return await Account.update(accountData, {
        where: { id: accountId },
      });
    } catch (error) {
      throw new Error("Failed to update account");
    }
  }

  public async deleteAccount(accountId: number): Promise<boolean> {
    try {
      return await Account.destroy({where: { id: accountId }}) == 1;
    } catch (error) {
      throw new Error("Failed to delete account");
    }
  }
}

export default new AccountService();