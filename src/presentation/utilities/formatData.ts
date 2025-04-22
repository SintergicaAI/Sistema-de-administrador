import {User} from "../../domain/entities/User.ts";
import {v4 as uuid} from "uuid";



export const formatData = (data: User[]) =>
    data.map((user) => ({
        ...user,
        fullName: `${user.fullName}`,
        key: uuid(),
    }));