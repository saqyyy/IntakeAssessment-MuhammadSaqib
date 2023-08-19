import { createStyles, rem } from "@mantine/core";

export const imageUpload = createStyles((theme) => ({
  imageUploadWrapper: {
    minHeight: rem(220), 
    pointerEvents: 'none'
  }
}));

export const addExpense = createStyles((theme) => ({
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: '80% !important',
    margin: '0 auto',
    marginBottom: '20px'
  }
})
);

export const authForm = createStyles((theme) => ({
  formWrapper: {
    maxWidth: '500px',
    margin: '0 auto',
    marginTop: '95px',
  },
  button: {
    width: '100px',
  }
}));

export const table = createStyles((theme) => ({
  tableWrapper: {
    marginTop: '35px',
    width: '80% !important',
    margin: '0 auto',

    '& > *': {
      textTransform: 'capitalize',
    },
    '& > * .email' :{
      textTransform: 'lowercase'
    }
  },
  approved: {
    color: '#12b886'
  },
  rejected: {
    color: '#ff2d07'
  },
}));


export const useLayout = createStyles(() => ({
  navbar: {
    maxWidth: '300px',
    marginLeft: 'auto'
  },
  app: {
    marginBottom: '50px'
  }
}))

export const profile = createStyles((theme) => ({
  user: {
    minWidth: '350px',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export const expensesStyles = createStyles(()=> ({
  wrapper: {
    maxWidth: '80%',
    margin: '0 auto',
  },
  loader: {
    position: 'fixed',
    left: '50%',
    top: '50%',
  }
}))

export const dashboardStyles = createStyles(()=> ({
  wrapper: {
    maxWidth: '80%',
    margin: '0 auto',
    marginBottom: '40px',
  },
  loader: {
    position: 'fixed',
    left: '50%',
    top: '50%',
  }
}))

export const addExpenseFormStyles = createStyles(()=>({
  button: {
    width: '100px',
  }
}))
