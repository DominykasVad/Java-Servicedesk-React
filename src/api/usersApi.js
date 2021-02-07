import HTTP from './';

export const login = (userLogin) => HTTP.post('/user/login', userLogin);

export const fetchAllUsers = () => HTTP.get('/user');

export const fetchSingleUser = (id) => HTTP.get(`/user/${id}`);

export const addUser = (newUser) => HTTP.post('/user', newUser);

export const updateUser = (updatedServiceRequest) => HTTP.put('/user', updatedServiceRequest);

export const deleteUser = (id) => HTTP.delete(`/user/${id}`);
