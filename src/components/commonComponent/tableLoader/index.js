import { Skeleton, Grid } from '@mui/material'

const TableLoader = () => {
  return (
    <>
      {Array(48)
        .fill(0)
        .map((key, index) => (
          <Grid item md={1.5} xs={2} key={index}>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={'100%'} animation='wave'/>
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} width={'100%'} animation='wave'/>
          </Grid>
        ))}
    </>
  )
}

export default TableLoader
