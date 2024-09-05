import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  purple: {
    color: "purple",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 23.9,
    height: 500,
  },
  input: {
    height: 25,
    borderColor: "#757aff",
    borderWidth: 1,
    marginBottom: 15,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#7979FC",
    color: "white",
    fontSize: 24,
    alignSelf: "center",
    width: "60%",
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
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    bottom: 20,
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
    width: 200,
    marginLeft: "25%",
    marginTop: -25,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  inputxt: {
    textAlign: "center",
    fontSize: 18,
  },
  label: {
   
  },
});

export default styles;
