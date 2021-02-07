import {Skeleton} from '@material-ui/lab';
import {serviceRequestStyles} from '../serviceRequestStyles';
import {Grid} from '@material-ui/core';


export const ContentSkeletonLoader = () => {
    const classes = serviceRequestStyles();
    return (
        <div className={classes.formRoot}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                spacing={4}

            >
                <Grid item xs={12}>
                    <Skeleton variant={'rect'} height={40} width={'40%'}/>
                </Grid>
                <Grid item xs={6}>
                    <Skeleton variant={'rect'} height={40} width={'100%'}/>
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant={'rect'} height={40} width={'100%'}/>
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant={'rect'} height={40} width={'100%'}/>
                </Grid>
                <Grid item xs={6}>
                    <Skeleton variant={'rect'} height={200} width={'100%'}/>
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant={'rect'} height={40} width={'100%'}/>
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant={'rect'} height={40} width={'100%'}/>
                </Grid>
            </Grid>
        </div>
    );
};

export const TableSkeletonLoader = () => (
    <>
        <Skeleton/>
        <Skeleton/>
        <Skeleton variant={'rect'} height={250}/>
    </>
);