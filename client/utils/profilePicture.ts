import { Directory, File, Paths } from "expo-file-system";

const PICTURE_DIRECTORY = "profile-picture";

const pictureDirectory = (): Directory =>
  new Directory(Paths.document, PICTURE_DIRECTORY);

const pictureFile = (fileName: string): File =>
  new File(pictureDirectory(), fileName);

export const persistProfilePicture = (
  sourceUri: string,
  previousFileName?: string,
): string => {
  const directory = pictureDirectory();
  if (!directory.exists) {
    directory.create({ intermediates: true, idempotent: true });
  }

  const extension = Paths.extname(sourceUri) || ".jpg";
  const destination = new File(directory, `profile-${Date.now()}${extension}`);

  new File(sourceUri).copy(destination);

  if (previousFileName && previousFileName !== Paths.basename(destination)) {
    deleteProfilePicture(previousFileName);
  }

  return Paths.basename(destination);
};

export const readProfilePictureUri = (fileName: string): string | null => {
  if (!fileName) return null;
  try {
    const file = pictureFile(fileName);
    return file.exists ? file.uri : null;
  } catch (error) {
    console.warn("[profilePicture] Failed to resolve", fileName, error);
    return null;
  }
};

export const deleteProfilePicture = (fileName: string): void => {
  if (!fileName) return;
  try {
    const file = pictureFile(fileName);
    if (file.exists) file.delete();
  } catch (error) {
    console.warn("[profilePicture] Failed to delete", fileName, error);
  }
};

export const clearProfilePictures = (): void => {
  try {
    const directory = pictureDirectory();
    if (directory.exists) directory.delete();
  } catch (error) {
    console.warn("[profilePicture] Failed to clear stored pictures", error);
  }
};
