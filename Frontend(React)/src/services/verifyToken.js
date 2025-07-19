// src/services/verifyToken.js
import api from './api';

const verifyToken = async () => {
    try {
        const token = sessionStorage.getItem('access_token');
        if (!token) return false;

        const res = await api.post('/token-authenticate/', null, {
            headers: {
                Authorization: token
            }
        });
        console.log("THIS IS RESPONSE", res)
        const student = res.data;
        sessionStorage.setItem('student', JSON.stringify(student));
        // return res.status === 200;
        return student
    } catch (err) {
        console.error("Token verification faileddd:", err);
        return false;
    }
};

export default verifyToken;

// import api from './api';

// const verifyToken = async () => {
//     try {
//         const token = sessionStorage.getItem('access_token');
//         if (!token) return null;

//         const res = await api.post('/token-authenticate/', null, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         // ✅ Store student object in sessionStorage or return it
//         const student = res.data;
//         sessionStorage.setItem('student', JSON.stringify(student));
//         return student;
//     } catch (err) {
//         console.error("Token verification failed:", err);
//         return null;
//     }
// };

// export default verifyToken;

