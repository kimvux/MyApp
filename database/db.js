import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export const getDB = async() => {
    try{
        if (!dbInstance){
            dbInstance = await SQLite.openDatabaseAsync('data.db');
        }
        return dbInstance;
    }
    catch(error){
        console.error("Lỗi kết nối Database:", error);
        throw error;
    }
}

export const clearAllData = async (db) => {
  await db.withTransactionAsync(async () => {
    await db.execAsync(`
        DELETE FROM comments;
        DELETE FROM posts;
        DELETE FROM users;
        DROP TABLE IF EXISTS Comments;
        DROP TABLE IF EXISTS Posts;
        DROP TABLE IF EXISTS Users;
    `);
    createTable(db);
  });
};

export const createTable = async(db) => {
    try{
        await db.execAsync(`
            CREATE table if not exists Users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT not null,
                password TEXT not null,
                address TEXT,
                avatar TEXT,
                description TEXT
            );  
            CREATE table if not exists Posts(
                postid INTEGER PRIMARY KEY AUTOINCREMENT,
                userid INTEGER NOT NULL,
                des TEXT,
                picture TEXT,
                imageHeight TEXT,
                createdAt TEXT,
                FOREIGN KEY (userid) REFERENCES Users (id) ON DELETE CASCADE
            );   
            CREATE table if not exists Comments(
                commentid INTEGER PRIMARY KEY AUTOINCREMENT,
                postid INTEGER NOT NULL,
                userid INTEGER NOT NULL,
                comment TEXT,
                createdAt TEXT,
                FOREIGN KEY (postid) REFERENCES Posts (postid) ON DELETE CASCADE,
                FOREIGN KEY (userid) REFERENCES Users (id) ON DELETE CASCADE
            );   
        `)
    }
    catch(error){
        console.error("Lỗi khi tạo bảng:", error);
    }
}

export const getPostsData = async(db) => {
    try{
        const postsData = await db.getAllAsync(`
        select * 
        from Posts p join Users u on p.userid = u.id
        order by p.createdAt desc;
        `)
        console.log("Load posts thành công");
        return postsData;
    }
    catch(error){
        console.error("Lỗi khi lấy danh sách Posts:", error);
        return [];
    }
}

export const getUsersData = async(db) => {
    try{
        const usersData = await db.getAllAsync(`select * from Users;`)
        return usersData;
    }
    catch(error){
        console.error("Lỗi khi lấy danh sách Users:", error);
        return [];
    }
}

export const insertUser = async(db, name, password, email, address, avatar, description) => {
    try{
        await db.runAsync(
            `insert into Users (name, password, email, address, avatar, description) values (?,?,?,?,?,?);`,
            [name, password, email, address, avatar, description]
        );
    }
    catch(error){
        console.error("Lỗi khi thêm User:", error);
    }
}

export const updateUser = async(db, id, name, email, address, avatar, description) => {
    try{
        await db.runAsync(
            `update Users 
            set name = ?, email = ?, address = ?, avatar = ?, description = ?
            where id = ?;`,
            [name, email, address, avatar, description, id]
        );
        console.log("Update thành công");
    }
    catch(error){
        console.error("Lỗi khi sửa User:", error);
    }
}

export const insertPost = async(db, userid, des, picture, imageHeight, createdAt) => {
    try{
        await db.runAsync(
            `insert into Posts (userid, des, picture, imageHeight, createdAt) values (?,?,?,?,?);`,
            [userid, des, picture, imageHeight, createdAt]
        );
    }
    catch(error){
        console.error("Lỗi khi thêm Posts:", error);
    }
}

export const insertComment = async(db, postid, userid, comment, createdAt) => {
    try{
        await db.runAsync(
            `insert into Comments (postid, userid, comment, createdAt) values (?,?,?,?);`,
            [postid, userid, comment, createdAt]
        );
        console.log("Comment thành công");
    }
    catch(error){
        console.error("Lỗi khi thêm Comments:", error);
    }
}

export const getCommentsForPost = async(db, postid) => {
    try{
        const comments = await db.getAllAsync(
            `select c.comment, u.name, u.avatar, c.createdAt
            from Comments c join Posts p on c.postid = p.postid
                join Users u on u.id = c.userid
            where p.postid = ?
            order by c.createdAt desc;`,
            [postid]
        );
        return comments;
    }
    catch(error){
        console.error("Lỗi khi load Comments:", error);
        return [];
    }
}