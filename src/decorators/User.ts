import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@ValidatorConstraint({ name: "UniqueEmailUserValidator", async: true })
@Injectable()
export class UniqueEmailUserValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    public userModel: Repository<User>,
  ) {}

  async validate(value: string): Promise<boolean> {
    try {
      const existEmail = await this.userModel.findOneBy({
        email: value,
      });
      return !existEmail;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  defaultMessage(): string {
    return "El email ya se encuentra registrado, registre uno nuevo";
  }
}

@ValidatorConstraint({ name: "UniqueIdCardUserValidator", async: true })
@Injectable()
export class UniqueIdCardUserValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    public userModel: Repository<User>,
  ) {}

  async validate(value: string): Promise<boolean> {
    try {
      const existIdCard = await this.userModel.findOneBy({
        id_card: value,
      });
      return !existIdCard;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  defaultMessage(): string {
    return "El DNI ya se encuentra registrado, registre uno nuevo";
  }
}

// Nombre del decorador UniqueIdCardUser
export const UniqueIdCardUser = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueIdCardUserValidator,
    });
  };
};

// Nombre del decorador UniqueEmailUser
export const UniqueEmailUser = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueEmailUserValidator,
    });
  };
};
