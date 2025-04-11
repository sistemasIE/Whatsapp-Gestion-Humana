-- RECLUTAMIENTO

CREATE TABLE Reclutamiento(
idReclutamiento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
chatId BIGINT NOT NULL,
nombre VARCHAR(60) NULL,
telefono VARCHAR(60) NULL,
ciudad VARCHAR(60) NULL,
revisado BOOLEAN DEFAULT False
);

ALTER TABLE Reclutamiento ADD UNIQUE (chatId)
;

-- DOCUMENTO
			-- tipoDocumento 
			CREATE TABLE TipoDocumento (
				idTipoDocumento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
				nombreDocumento VARCHAR(50) NOT NULL
			);

			INSERT INTO TipoDocumento(nombreDocumento) VALUES("Certificado Laboral");
			INSERT INTO TipoDocumento(nombreDocumento) VALUES("Carnet");
			INSERT INTO TipoDocumento(nombreDocumento) VALUES("Desprendibles");

-- SOLICITAR DOCUMENTOS

CREATE TABLE solicitarDocumentos (
idSolicDoc INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
chatId VARCHAR(20) NOT NULL,
fechaSolicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
idTipoDocumento INT NOT NULL, 
nombreEmpleado VARCHAR(30) NULL,
numeroDeCedula VARCHAR(50) NULL,
correoElectronico VARCHAR(100) NULL,
revisado BOOLEAN DEFAULT False,
FOREIGN KEY (idTipoDocumento) REFERENCES TipoDocumento(idTipoDocumento)

);

ALTER TABLE SOLICITARDOCUMENTOS ADD UNIQUE  SolicitarDocumentos(chatId);

-- OTRAS CONSULTAS

CREATE TABLE Otros (
idOtros INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
chatId BIGINT NOT NULL,
nombre VARCHAR(60) NULL,
motivo VARCHAR(400) NULL,
revisado BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE Otros ADD UNIQUE(chatId);
