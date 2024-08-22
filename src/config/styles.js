import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },    
    purple: {
        color: 'purple',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      },
      input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
      },
      button: {
        marginTop: 12,
      },
      error: {
        color: "red",
      },
      containerFull: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        padding: 20,
      },
      innerContainer: {
        paddingHorizontal: 20,
        alignSelf: "stretch",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
      },
      modal: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        margin: 20,
      },
      item: {
        backgroundColor: "#ffffff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        width: "90%",
      },
      errorText: {
        color: "red",
        fontSize: 16,
      },
      image: {
        height: 259,
        width: 259,
      },
      paragraph: {
        fontSize: 18,
        textAlign: "center",
      },
})

export default styles;