// ** MUI Imports
import { Theme } from '@mui/material/styles'

const DataGrid = (theme) => {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 0,
          color: theme.palette.text.primary,
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
          }
        },
        toolbarContainer: {
          paddingRight: `${theme.spacing(5)} !important`,
          paddingLeft: `${theme.spacing(3.25)} !important`
        },
        columnHeaders: {
          maxHeight: '54px !important',
          minHeight: '54px !important',
          lineHeight: '24px !important',
          backgroundColor: theme.palette.customColors.tableHeaderBg
        },
        columnHeader: {
          padding:'12px!important',
          height: '54px',
          '&:not(.MuiDataGrid-columnHeaderCheckbox)': {
            padding: theme.spacing(4),
            '&:first-of-type': {
              paddingLeft: `${theme.spacing(5)}!important`
            }
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(5)
          }
        },
        columnHeaderCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important'
        },
        columnHeaderTitleContainer: {
          padding: 0
        },
        columnHeaderTitle: {
          fontSize: '0.75rem',
          letterSpacing: '0.17px',
          textTransform: 'uppercase'
        },
        columnSeparator: {
          color: theme.palette.divider
        },
        virtualScroller: {
          marginTop: '54px !important'
        },
        virtualScrollerContent:{
          height:'500px!important'
        },
        virtualScrollerRenderZone: {
          '& .MuiDataGrid-row': {
            maxHeight: 'unset !important',
            minHeight: 'unset !important'
          }
        },
        row: {
          '&:last-child': {
            '& .MuiDataGrid-cell': {
              borderBottom: 0,
            }
          }
        },
        cell: {
          padding:'12px!important',
          maxHeight: 'unset !important',
          minHeight: 'unset !important',
          lineHeight: '20px !important',
          borderColor: theme.palette.divider,
          '&:not(.MuiDataGrid-cellCheckbox)': {
            padding: theme.spacing(4),
            '&:first-of-type': {
              paddingLeft: `${theme.spacing(5)}!important`
            }
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(5)
          },
          '&:focus, &:focus-within': {
            outline: 'none'
          }
        },
        cellCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important'
        },
        editInputCell: {
          padding: 0,
          color: theme.palette.text.primary,
          '& .MuiInputBase-input': {
            padding: 0
          }
        },
        footerContainer: {
          minHeight: 'unset !important',
          borderTop: `1px solid ${theme.palette.divider}`,
          '& .MuiTablePagination-toolbar': {
            minHeight: 'unsetpx !important'
          },
          '& .MuiTablePagination-select': {
            color: theme.palette.text.primary
          }
        }
      },
      defaultProps: {
        rowHeight: 50,
        headerHeight: 54
      }
    }
  }
}

export default DataGrid
