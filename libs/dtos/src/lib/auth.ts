import { User } from '../../../../apps/node_modules/@hostinfo/auth-prisma';

/*
Data transfer Object modell(object that carries data between processes)
Object sent by client to server
*/
export type LoginDto = Pick<User, 'username' | 'password'>;
//pick properties from User Interface only for keyvalues 'username','password'
/* Same as:
interface LoginDto {
    username: string;
    password: string;
}
*/

export type UserDto = Omit<User, 'password'>;
