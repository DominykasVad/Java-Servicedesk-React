import {
    setLinkConfigurationItemToServiceRequest,
    setUnlinkConfigurationItemToServiceRequest
} from '../../api/configurationItemApi';
import {deleteServiceRequest, takeOwnershipOfServiceRequest} from '../../api/serviceRequestApi';

export const linkConfigurationItemToServiceRequest = (serviceRequestId, configurationItemId, enqueueSnackbar) => {
    const linkObject = {
        'id': configurationItemId,
        'serviceRequestId': serviceRequestId
    };
    setLinkConfigurationItemToServiceRequest(linkObject)
        .then(() => {
            enqueueSnackbar('Successfully linked Configuration Item', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        })
        .catch(() => {
            enqueueSnackbar('Failed to get data', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        });
};

export const unlinkConfigurationItemToServiceRequest = (serviceRequestId, configurationItemId, enqueueSnackbar) => {
    const unlinkObject = {
        'id': configurationItemId,
        'serviceRequestId': serviceRequestId
    };
    setUnlinkConfigurationItemToServiceRequest(unlinkObject)
        .then(() => {
            enqueueSnackbar('Successfully unlinked Configuration Item', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        })
        .catch(() => {
            enqueueSnackbar('Failed to get data', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        });
};

export const removeServiceRequest = (serviceRequestId, enqueueSnackbar) => {
    deleteServiceRequest(serviceRequestId)
        .then(() => {
            enqueueSnackbar('Successfully unlinked Configuration Item', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        })
        .catch(() => {
            enqueueSnackbar('Failed to get data', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        });
};

export const takeOwnership = (serviceRequestId, enqueueSnackbar) => {
    const serviceRequest = {
        'id': serviceRequestId,
    };
    takeOwnershipOfServiceRequest(serviceRequest)
        .then(() => {
            enqueueSnackbar('Successfully unlinked Configuration Item', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        })
        .catch(() => {
            enqueueSnackbar('Failed to get data', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        });
};

