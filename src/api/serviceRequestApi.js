import HTTP from './';
import _ from 'lodash';

export const fetchServiceRequests = (page, pageSize, sort) => HTTP.get('/sr', {
    params: {
        page: page,
        size: pageSize,
        sort: _.isNil(sort) || _.isNil(sort.field || sort.sort) ? '' : `${sort.field},${sort.sort}`,
    }
});

export const fetchServiceRequestsByOwnerId = (ownerId, page, pageSize, sort) => HTTP.get('/sr', {
    params: {
        ownerId: ownerId,
        page: page,
        size: pageSize,
        sort: _.isNil(sort) || _.isNil(sort.field || sort.sort) ? '' : `${sort.field},${sort.sort}`,
    }
});

export const fetchSingleServiceRequest = (id) => HTTP.get(`/sr/${id}`);

export const addServiceRequest = (newServiceRequest) => HTTP.post('/sr', newServiceRequest);

export const updateServiceRequest = (updatedServiceRequest) => HTTP.put('/sr', updatedServiceRequest);

export const takeOwnershipOfServiceRequest = (serviceRequest) => HTTP.post('/sr/take-ownership', serviceRequest);

export const deleteServiceRequest = (id) => HTTP.delete(`/sr/${id}`);

