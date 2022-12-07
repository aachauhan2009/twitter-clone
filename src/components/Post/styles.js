import theme from '../../constants/theme';

export const styles = {
         post: {
           margin: 20,
           border: `1px solid ${theme.background}`,
           borderRadius: 3,
           overflowWrap: "break-word",
           whiteSpace: "pre-wrap",
         },
         heading: {
           padding: 10,
           display: "flex",
           alignItems: "center",
           justifyContent: "flex-start",
           borderBottom: "1px solid #e4e4e4",
           background: theme.background,
         },
         profilePic: {
           height: 30,
           width: 30,
           borderRadius: "50%",
           marginRight: 5,
         },
         text: {
           padding: 10,
         },
         actions: {
           flex: 1,
           display: "flex",
           alignItems: "center",
           justifyContent: "flex-end",
           padding: 10,
         },
         actionButton: {
           padding: 5,
           margin: "0, 10",
           background: "none",
           border: `1px solid ${theme.secondary}`,
           borderRadius: 6,
         },
         link: {
           textDecoration: "none",
           color: theme.secondary,
         },
       };
