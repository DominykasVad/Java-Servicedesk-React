import HTTP from './';
import _ from 'lodash';

export const fetchConfigurationItems = (page, pageSize, sort) => HTTP.get('/ci', {
    params: {
        page: page,
        size: pageSize,
        sort: _.isNil(sort) || _.isNil(sort.field || sort.sort) ? '' : `${sort.field},${sort.sort}`,
    }
});

export const fetchConfigurationItemsByServiceRequestId = (serviceRequestId, page, pageSize, sort) => HTTP.get('/ci', {
    params: {
        serviceRequestId: serviceRequestId,
        page: page,
        size: pageSize,
        sort: _.isNil(sort) || _.isNil(sort.field || sort.sort) ? '' : `${sort.field},${sort.sort}`,
    }
});

export const setLinkConfigurationItemToServiceRequest = (linkObject) => HTTP.post('/ci/link-ci', linkObject);

export const setUnlinkConfigurationItemToServiceRequest = (unlinkObject) => HTTP.post('/ci/unlink-ci', unlinkObject);

export const addConfigurationItem = (newConfigurationItem) => HTTP.post('/ci', newConfigurationItem);

export const updateConfigurationItem = (updatedConfigurationItem) => HTTP.put('/ci', updatedConfigurationItem);

export const deleteConfigurationItem = (id) => HTTP.delete(`/ci/${id}`);
