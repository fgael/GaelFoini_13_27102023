import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  selectUserProfile,
  updateUserProfile,
} from "../../state/user/userSlice";
import { selectToken } from "../../state/auth/authSlice";

import fetchAPI from "../../services/fetchAPI";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import AccountCard from "../../components/AccountCard/AccountCard";

import styles from "../Profile/Profile.module.css";

const Profile = () => {
  // Initializing Redux dispatch and selecting state from the store
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const token = useSelector(selectToken);

  // Setting up state for edited first and last names
  const [editedFirstName, setEditedFirstName] = useState(userProfile.firstName);
  const [editedLastName, setEditedLastName] = useState(userProfile.lastName);

  // State for tracking the edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Event handlers for input changes
  const handleFirstNameChange = (e) => setEditedFirstName(e.target.value);
  const handleLastNameChange = (e) => setEditedLastName(e.target.value);

  // Handler for entering edit mode
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Keyboard "enter" handler for saving changes
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // Handler for canceling edits
  const handleCancel = () => {
    setEditedFirstName(userProfile.firstName);
    setEditedLastName(userProfile.lastName);

    setIsEditMode(false);
  };

  const handleSave = async () => {
    // Checking if names have been changed
    const isFirstNameChanged = editedFirstName !== userProfile.firstName;
    const isLastNameChanged = editedLastName !== userProfile.lastName;

    // If no changes, exit edit mode
    if (!isFirstNameChanged && !isLastNameChanged) {
      setIsEditMode(false);
      return;
    }

    try {
      // Updating user profile via API call
      const response = await fetchAPI.updateProfile(token, {
        firstName: editedFirstName,
        lastName: editedLastName,
      });

      // If successful response, update state and exit edit mode
      if (response) {
        dispatch(
          updateUserProfile({
            firstName: isFirstNameChanged
              ? editedFirstName
              : userProfile.firstName,
            lastName: isLastNameChanged ? editedLastName : userProfile.lastName,
          })
        );

        setIsEditMode(false);
      }
    } catch (error) {
      // Log error if update fails
      console.error("Error while updating profile", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className={styles["header"]}>
          <h1 className={styles["header-h1"]}>Welcome back</h1>
          {isEditMode ? (
            <div className={styles["edit-container"]}>
              {/* edit display */}
              <div className={styles["edit-container-input"]}>
                <input
                  className={styles["input-name"]}
                  value={editedFirstName}
                  onChange={handleFirstNameChange}
                  onKeyDown={handleKeyDown}
                />
                <input
                  className={styles["input-name"]}
                  value={editedLastName}
                  onChange={handleLastNameChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className={styles["edit-button-container"]}>
                <Button
                  className={styles["edit-button"]}
                  onClick={handleSave}
                  label="Save"
                />
                <Button
                  className={styles["edit-button"]}
                  onClick={handleCancel}
                  label="Cancel"
                />
              </div>
            </div>
          ) : (
            <div>
              {/* read-only display */}
              <h1 className={styles["header-user-name"]}>
                {userProfile.firstName}&nbsp;{userProfile.lastName}!
              </h1>
              <Button
                className={styles["edit-button"]}
                onClick={handleEdit}
                label="Edit Name"
              />
            </div>
          )}
        </div>
        {/* need to get API data as props when available */}
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>

      <Footer />
    </>
  );
};

export default Profile;
