import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  saveButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  imageItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  readOnlyText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  addMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addMediaButtonText: {
    marginLeft: 10,
    color: '#007AFF',
  },
  mediaItem: {
    marginBottom: 10,
  },
  mediaPreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 5,
  },
});

export default styles;