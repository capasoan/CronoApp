 import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const loadProfileFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Profile'); 
      if (jsonValue != null) { 
        const savedProfile = JSON.parse(jsonValue); 
        setName(savedProfile.name); 
        setEmail(savedProfile.email); 
        setIsProfileCreated(true);
      }
    } catch (e) {
      console.error('Error al cargar el perfil desde AsyncStorage:', e);
      return [];
    }
  };

  
  const saveProfileToStorage = async (ProfileToSave) => {
    try {
      await AsyncStorage.setItem('Profile', JSON.stringify(ProfileToSave)); 
    } catch (e) {
      console.error('Error al guardar el perfil en AsyncStorage:', e);
    }
  };

  useEffect(() => {
    loadProfileFromStorage();
  }, []); 

  
  
  const handleEdit = () => {
    setIsEditing(!isEditing);
   
  };

  
  const handleSave = () => {
    const profileData = {
      name,
      email,
    };

    if (!isProfileCreated) {
      setIsProfileCreated(true); 
    }
    setIsEditing(false);
    saveProfileToStorage(profileData)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isProfileCreated ? "User Profile" : "Create Profile"}</Text>
      <View style={styles.form}>
        {isProfileCreated && ( 
          <>
            <Text style={styles.label}>Name: {name}</Text>
            <Text style={styles.label}>Email: {email}</Text>
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          editable={isEditing || !isProfileCreated} 
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={isEditing || !isProfileCreated} 
        />
      </View>
      <Button title={isProfileCreated ? (isEditing ? "Save" : "Edit") : "Create"} onPress={isEditing ? handleSave : handleEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Profile;
