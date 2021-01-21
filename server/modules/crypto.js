const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

module.exports = {
    // 입력된 비밀번호를 salt를 사용해서 hash한 값으로 반환하는 함수 - 회원가입에 사용
    encrypt: async (password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = (await crypto.randomBytes(32)).toString('hex');
                pbkdf2.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
                    if(err) throw err;
                    const hashed = derivedKey.toString('hex');
                    resolve({salt,hashed});
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    },
    // salt값을 가지고 로그인할 때 입력하는 비밀번호를 hash해서 해시된 비밀번호 반환하는 함수
    encryptWithSalt: async (password, salt) => {
        return new Promise(async (resolve, reject) => {
            try {
                pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
                    if(err) throw err;
                    const hashed = derivedKey.toString('hex');
                    resolve(hashed);
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }
}