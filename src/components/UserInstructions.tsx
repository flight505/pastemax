import React from "react";
import styles from "./UserInstructions.module.css";

interface UserInstructionsProps {
  instructions: string;
  setInstructions: (value: string) => void;
}

const UserInstructions = ({
  instructions,
  setInstructions,
}: UserInstructionsProps): JSX.Element => {
  return (
    <>
      <div className={styles.userInstructionsHeader}>
        <label className="content-title" htmlFor="userInstructionsInput">
          User Instructions
        </label>
      </div>
      <div className={styles.userInstructionsContainer}>
        <div className={styles.userInstructions}>
          <textarea
            id="userInstructionsInput"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Add instructions to pass to the LLM about how to transform the content..."
            className={styles.textarea}
          />
        </div>
      </div>
    </>
  );
};

export default UserInstructions;
