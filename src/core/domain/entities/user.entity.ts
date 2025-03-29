import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity<UserEntityProps> {
  private props: Omit<UserEntityProps, keyof BaseEntityProps>;

  constructor(props: UserEntityProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
      props,
    });
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }
}




// export class User extends BaseEntity<PrismaUser> {
//   private _email: string;
//   private _password: string;
//   private _emailVerified: boolean;
//   private _lastName: string | null;
//   private _firstName: string | null;
//   private _lastNameKana: string | null;
//   private _firstNameKana: string | null;
//   private _phone: string | null;
//   private _companyId: string | null;
//   private _company: Company | null;

//   constructor({
//     id,
//     email,
//     emailVerified,
//     lastName,
//     firstName,
//     lastNameKana,
//     firstNameKana,
//     phone,
//     companyId,
//     createdAt,
//     updatedAt,
//     deletedAt,
//     password,
//   }: {
//     id?: string;
//     email: string;
//     emailVerified: boolean;
//     lastName: string | null;
//     firstName: string | null;
//     lastNameKana: string | null;
//     firstNameKana: string | null;
//     phone: string | null;
//     companyId: string | null;
//     createdAt?: Date;
//     updatedAt?: Date;
//     deletedAt?: Date | null;
//     password?: string;
//   }) {
//     super({
//       id,
//       createdAt,
//       updatedAt,
//       deletedAt,
//       props: {
//         email,
//         emailVerified,
//         lastName,
//         firstName,
//         lastNameKana,
//         firstNameKana,
//         phone,
//         companyId,
//         password,
//       },
//     });
//     this.setEmail = email;
//     this.setEmailVerified = emailVerified;
//     this.setLastName = lastName;
//     this.setFirstName = firstName;
//     this.setLastNameKana = lastNameKana;
//     this.setFirstNameKana = firstNameKana;
//     this.setPhone = phone;
//     this.setCompanyId = companyId;
//     this.setPassword = password;
//   }

//   public toProfileResponse() {
//     const { password, ...userRes } = this.toResponse();
//     return userRes;
//   }

//   static fromPresentation(user: PrismaUser): User {
//     return new User({
//       id: user.id,
//       email: user.email,
//       emailVerified: user.emailVerified,
//       lastName: user.lastName,
//       firstName: user.firstName,
//       lastNameKana: user.lastNameKana,
//       firstNameKana: user.firstNameKana,
//       phone: user.phone,
//       companyId: user.companyId,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//       deletedAt: user.deletedAt,
//       password: user.password,
//     });
//   }

//   async verifyEmailAndSetPassword(
//     token: Token,
//     password: string,
//     confirmPassword: string,
//   ): Promise<void> {
//     if (this.emailVerified) {
//       throw new ConflictError('Email already verified');
//     }

//     if (token.isExpired) {
//       throw new BadRequestException('Verification token has expired');
//     }

//     if (password !== confirmPassword) {
//       throw new BadRequestException('Passwords do not match');
//     }

//     this.validatePasswordStrength(password);

//     this.setPassword = await hash(password);
//     this.setEmailVerified = true;
//   }

//   async updatePassword(password: string): Promise<void> {
//     this.validatePasswordStrength(password);

//     this.setPassword = await hash(password);
//   }

//   getPassword(): string {
//     return this.password;
//   }

//   isIncorrectEmail(email: string): boolean {
//     return this.email !== email;
//   }

//   validatePasswordStrength(password: string): void {
//     if (
//       !z
//         .string()
//         .regex(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
//         )
//         .safeParse(password).success
//     ) {
//       throw new BadRequestException(
//         'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
//       );
//     }
//   }

//   public validate(): void {}

//   public resetEntity(entity: PrismaUser): User {
//     return new User(entity);
//   }

//   // getters
//   get email(): string {
//     return this._email;
//   }

//   get emailVerified(): boolean {
//     return this._emailVerified;
//   }

//   get lastName(): string | null {
//     return this._lastName;
//   }

//   get firstName(): string | null {
//     return this._firstName;
//   }

//   get lastNameKana(): string | null {
//     return this._lastNameKana;
//   }

//   get firstNameKana(): string | null {
//     return this._firstNameKana;
//   }

//   get phone(): string | null {
//     return this._phone;
//   }

//   get companyId(): string | null {
//     return this._companyId;
//   }

//   get password(): string {
//     return this._password;
//   }

//   get company(): Company | null {
//     return this._company;
//   }

//   // setters
//   set setEmail(email: string) {
//     this._email = email;
//   }

//   set setEmailVerified(emailVerified: boolean) {
//     this._emailVerified = emailVerified;
//   }

//   set setLastName(lastName: string | null) {
//     this._lastName = lastName;
//   }

//   set setFirstName(firstName: string | null) {
//     this._firstName = firstName;
//   }

//   set setLastNameKana(lastNameKana: string | null) {
//     this._lastNameKana = lastNameKana;
//   }

//   set setFirstNameKana(firstNameKana: string | null) {
//     this._firstNameKana = firstNameKana;
//   }

//   set setPhone(phone: string | null) {
//     this._phone = phone;
//   }

//   set setCompanyId(companyId: string | null) {
//     this._companyId = companyId;
//   }

//   set setPassword(password: string | undefined) {
//     this._password = password;
//   }

//   get fullName(): string {
//     return `${this.lastName} ${this.firstName}`;
//   }

//   get fullNameKana(): string {
//     return `${this.lastNameKana} ${this.firstNameKana}`;
//   }

//   set setCompany(company: Company) {
//     this._company = company;
//   }
// }
