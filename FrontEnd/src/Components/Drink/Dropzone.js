import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RiErrorWarningLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

/* Estilos del dropzone */
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

/* Inicio del componente */
const Dropzone = ({ setMeDrink, meDrink }) => {
  /* state de la imagen para vista previa  */
  const [imageFile, setimageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [exceededLimit, setExceededLimit] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setExceededLimit(true);
      setTimeout(() => {
        setExceededLimit(false);
      }, 2000);
    } else {
      setSelectedImage(
        acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      );

      //console.log(acceptedFiles[0]);
      setimageFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: "image/*", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject || exceededLimit ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, exceededLimit]
  );

  /* crear elemento de imagen */
  const image = selectedImage?.map((file, index) => (
    <div key={index}>
      <img
        src={file.preview}
        className="img-fluid rounded-1"
        width={200}
        height={200}
        alt={file.name}
      />
    </div>
  ));

  // Función para convertir el archivo de imagen a base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleUrl = async() => {
    // Obtener la extensión de la imagen
    const extension = imageFile.name.split(".").pop().toLowerCase();
    // Crear un nombre único para la imagen
    const name = `image-${uuidv4()}.${extension}`;

    if (imageFile) {
      try {
        const base64Image = await convertImageToBase64(imageFile);
        //console.log(base64Image); // imagen en formato base64

        const uploadImage = {
          name: name,
          path: imageFile.path,
          type: imageFile.type,
          base64Data: base64Image,
        };
    
        setMeDrink({ ...meDrink, image: uploadImage });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (imageFile) {
      handleUrl();
    }
    // eslint-disable-next-line
  }, [imageFile]);

  return (
    <>
      <div className="container mt-2">
        {/* input del dropzone */}
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag and drop the image here, or click to select the image</p>
        </div>

        {/* Mensaje de aviso */}
        {exceededLimit && (
          <p className="text-danger mt-2 text-center">
            Solo puedes subir una imagen <RiErrorWarningLine />
          </p>
        )}

        {/* vista previa de la imagen */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          {image}
        </div>
      </div>
    </>
  );
};

export default Dropzone;
