import { createTheme } from "@mui/material";

const Colors = {
    primary: '#881600',
    secondary: '#881600'
    
};

const theme = createTheme({

    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary
        },
        
        
        
    },

    components: {

        MuiTypography: {
            defaultProps: {
                fontSize: '2rem',
                fontFamily: 'Public Sans, sans-serif',
                fontWeightRegular: 400,
                fontWeightMedium: 600,
                fontWeightBold: 700,
            }
        },

        overrides: {
            MuiCssBaseline: {
              '@global': {
                '@font-face': [],
              },
            },
          },
          
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    ":hover": { backgroundColor: 'rgba(139 139 139 / 40%)' },
                    fontSize: '1.2rem',
                    gap: '10px',
                    borderRadius: '30px'
                },

            },

        },

        MuiAccordion: {
            styleOverrides: {
                root: {
                    background: '#fff',
                    border: '2px solid #FE6A16',
                    width: '50rem',
                    justifyContent: 'center',
                    borderRadius: '10px',
                }
            }
        },

        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    borderRadius: '40px',
                    height: '2rem'
                },
                content: {
                    gap: 20,
                    justifyContent: 'center',
                    borderRadius: '40px'
                }
            },


        },

        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '0 0',
                    borderRadius: '40px',
                    
                }
            }
        },

        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: '#EAE0D5',
                }
            }
        },

        

        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: '#EAE0D5'
                }
            }
        },

    },


});

export default theme;