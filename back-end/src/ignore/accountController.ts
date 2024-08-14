import accountService from "../services/accountService";
import { Request } from "express";
import { MyResponse } from "../types";

export function createAccount(req: Request, res: MyResponse) {
  const {
    userName,
    password,
    email,
    name,
    surname,
    bio,
    address,
    phoneNumber,
  } = req.body;
  const missingFields = [];
  if (!userName) {
    missingFields.push("userName");
  }
  if (!password) {
    missingFields.push("password");
  }
  if (!email) {
    missingFields.push("email");
  }
  if (!name) {
    missingFields.push("name");
  }
  if (!surname) {
    missingFields.push("surname");
  }
  if (missingFields.length > 0) {
    return res.status(400).json({
      isSuccessful: false,
      message: `Missing required information: ${missingFields.join(", ")}`,
    });
  }

  accountService
    .createAccount({
      userName: userName,
      password: password,
      email: email,
      name: name,
      surname: surname,
      bio: bio,
      address: address,
      phoneNumber: phoneNumber,
    })
    .then((account) => {
      res.status(201).json({ isSuccessful: true, data: account });
    })
    .catch((error) => {
      res.status(500).json({ isSuccessful: false, message: error.message });
    });
}

export function deleteAccount(req: Request, res: MyResponse) {
  const { accountId } = req.body;
  if (!accountId) {
    return res
        .status(400)
        .json({ isSuccessful: false, message: "Missing required information: accountId" });
  }
  accountService
    .deleteAccount(accountId)
    .then((isDeleted) => {
      if (isDeleted) {
        res.status(200).json({ isSuccessful: true });
      } else {
        res
          .status(400)
          .json({ isSuccessful: false, message: "Account not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ isSuccessful: false, message: error.message });
    });
}
