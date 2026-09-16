import { Observable, of } from "rxjs";
import { RegisterUserRequest } from "../models/User-module/user-DTO.model";
import { User } from "../models/User-module/user.model";
import { Roles } from "../models/User-module/user.model";

const testUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@rms.com',
    passwordHash: 'admin',
    userRole: Roles.ADMIN,
    fullName: 'System Administrator',
    phoneNumber: '9876543210',
    address: '12 MG Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    isActive: true,
    createdDate: '2026-01-01',
    updatedDate: '2026-08-01'
  },
  {
    id: 2,
    username: 'rahul',
    email: 'rahul@rms.com',
    passwordHash: 'hashed_password_2',
    userRole: Roles.OWNER,
    fullName: 'Rahul Sharma',
    phoneNumber: '9876543211',
    address: '45 Baner Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411045',
    isActive: true,
    createdDate: '2026-01-05',
    updatedDate: '2026-08-02'
  },
  {
    id: 3,
    username: 'amit',
    email: 'amit@rms.com',
    passwordHash: 'hashed_password_3',
    userRole: Roles.OWNER,
    fullName: 'Amit Patil',
    phoneNumber: '9876543212',
    address: '22 Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    isActive: true,
    createdDate: '2026-01-10',
    updatedDate: '2026-08-03'
  },
  {
    id: 4,
    username: 'priya',
    email: 'priya@rms.com',
    passwordHash: 'hashed_password_4',
    userRole: Roles.TENANT,
    fullName: 'Priya Deshmukh',
    phoneNumber: '9876543213',
    address: '101 Wakad',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    isActive: true,
    createdDate: '2026-02-01',
    updatedDate: '2026-08-04'
  },
  {
    id: 5,
    username: 'rohit',
    email: 'rohit@rms.com',
    passwordHash: 'hashed_password_5',
    userRole: Roles.TENANT,
    fullName: 'Rohit Joshi',
    phoneNumber: '9876543214',
    address: '15 Hinjewadi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    isActive: true,
    createdDate: '2026-02-05',
    updatedDate: '2026-08-05'
  },
  {
    id: 6,
    username: 'neha',
    email: 'neha@rms.com',
    passwordHash: 'hashed_password_6',
    userRole: Roles.TENANT,
    fullName: 'Neha Kulkarni',
    phoneNumber: '9876543215',
    address: '33 Viman Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411014',
    isActive: true,
    createdDate: '2026-02-10',
    updatedDate: '2026-08-06'
  },
  {
    id: 7,
    username: 'sneha',
    email: 'sneha@rms.com',
    passwordHash: 'hashed_password_7',
    userRole: Roles.TENANT,
    fullName: 'Sneha More',
    phoneNumber: '9876543216',
    address: '8 Hadapsar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411028',
    isActive: true,
    createdDate: '2026-02-15',
    updatedDate: '2026-08-07'
  }
];

export function getAllUser(): User[] | undefined {
  return testUsers;
}

export function getUserById(id: number): User | undefined {
  return testUsers.find(u => u.id === id);
}

export function login(username: string, password: string): boolean {
  const user: User | undefined = testUsers.find(r => r.username === username);

  if (user !== null) {
    if (user?.passwordHash == password) {
      return true;
    }
    else { return false; }
  }
  else { return false; }
}

export function registerUser(body: RegisterUserRequest): Observable<boolean> {
  const user: User | undefined = testUsers.find(r => r.username === body.username);

  if (user) {
    return of(false);
  }
    const newUser: User = {
      id: testUsers.length + 1,
      username: body.username,
      email: body.email,
      passwordHash: body.passwordHash,
      userRole: body.userRole,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      address: body.address,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      isActive: true,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    }

    testUsers.push(newUser);

    return of(true);
}