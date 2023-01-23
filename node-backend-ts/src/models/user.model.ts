import bcrypt from 'bcrypt';
import db from '../database';
import User from '../types/user.type';
import config from '../config';
import pool from "../database"

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  /*
*param User u 
*It takes values (email, username, first_name, last_name, password )
 in string and insert data into table
*return User
 after adding data into table data will retun in the form of object with the given field
 (id,email, username, first_name, last_name, password )
*/
  async create(u: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
      values ($1, $2, $3, $4, $5) returning id, email, user_name, first_name, last_name`;
      const find = `SELECT id, email, user_name, first_name, last_name FROM users 
      WHERE email= ($1)`;
      // run query
      const emailCheck = await pool.query(find, [u.email]);
      if (emailCheck.rows[0]) {
        throw new Error(
          `User is Already Exist`
        );
      }
      const result = await pool.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `${(error as Error).message}`
      );
    }
  }
  /*
*return User
 It will return all the users data added into table with the given data
 (id,email, username, first_name, last_name, password )
*/
  async getMany(): Promise<User[]> {
    try {
      const sql =
        'SELECT id, email, user_name, first_name, last_name from users';
      const result = await pool.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`);
    }
  }
  /*
*param string ID
* It will take the id in integer format
*return User
 It will return the specific user according to the provided id the given data
 (id,email, username, first_name, last_name, password )
*/
  async getOne(id: string): Promise<User> {
    try {
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users 
      WHERE id=($1)`;
      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }

  /*
*param User u
* It will take the id in integer format and takes values (ID, email, username, first_name, last_name, password )
 in string and update data of user according to the given ID
*return User
 It will return the specific user according to the provided id the given data
 (id,email, username, first_name, last_name, password )
*/
  async updateOne(u: User): Promise<User> {
    try {
      const sql = `UPDATE users 
                  SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 
                  WHERE id=$6 
                  RETURNING id, email, user_name, first_name, last_name`;

      const result = await pool.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update user: ${u.user_name}, ${(error as Error).message}`
      );
    }
  }
  /*
*param string id
* It will take the id in integer for deleting the user and its data from table accoriding to the given ID,
* return string
 It will return the success message after deleting the data
*/
  async deleteOne(id: string): Promise<User> {
    try {
      const sql = `DELETE FROM users 
                  WHERE id=($1) 
                  RETURNING id, email, user_name, first_name, last_name`;
      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      );
    }
  }

  /*
*param string email, password
* It will take the data in the form of string the data will be (email, password). this will check the data into table and verify
* user is available into data
* return User
 After verifing user into table it will return a token related to the given data in the object
*/
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const sql = 'SELECT password FROM users WHERE email=$1';
      const result = await pool.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await pool.query(
            'SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
