# GUÍA DE APRENDIZAJE: GESTIÓN DE LA CONFIGURACIÓN CON GIT Y GITHUB
**Formato GFPI-F-135**

## 1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE

*   **Denominación del Programa de Formación:** Análisis y Desarrollo de Software (ADSO).
*   **Código del Programa de Formación:** 228118.
*   **Nombre del Proyecto:** Construcción de software a la medida para el sector empresarial.
*   **Fase del Proyecto:** Ejecución.
*   **Competencia:** Controlar la calidad del software de acuerdo con los estándares y requisitos técnicos.
*   **Resultado de Aprendizaje (RAP):** Gestionar la configuración y el control de versiones del software utilizando herramientas especializadas (Git/GitHub).
*   **Duración de la Guía:** 48 horas.

---

## 2. PRESENTACIÓN

**Estimado Aprendiz:**

Bienvenido al mundo del desarrollo de software profesional.

Imaginen por un momento que tienen una **"Máquina del Tiempo"**. Una máquina que les permite guardar el estado exacto del universo en un momento dado, y si cometen un error catastrófico en el futuro, pueden presionar un botón y regresar a ese punto seguro donde todo funcionaba.

En el desarrollo de software, esa máquina del tiempo se llama **Git**.

En el "mundo real" de la industria tecnológica, ya no trabajamos enviando correos con asuntos como *"proyecto_final.zip"*, *"proyecto_final_ahora_si.zip"* o *"proyecto_final_v3_este_si_funciona.rar"*. Eso es propenso a errores, pérdida de información y caos.

Hoy en día, usamos repositorios profesionales en la nube. Esta guía lo llevará desde los conceptos básicos hasta el flujo de trabajo colaborativo que utilizan empresas como Google, Microsoft y startups de todo el mundo. Aprenderemos a trabajar en equipo sin sobrescribir el trabajo de nuestros compañeros y a mantener la integridad de nuestro código.

¡Manos a la obra!

---

## 3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE

### 3.1 Actividad de Reflexión Inicial: El Problema del Caos

**Situación Problémica:**
Un equipo de tres desarrolladores (Ana, Beto y Carlos) está trabajando en una página web.
1.  Ana descarga los archivos a su computador y arregla el diseño del menú.
2.  Beto descarga los archivos (que no tienen los cambios de Ana) y arregla un error en el pie de página.
3.  Ana sube sus cambios al servidor.
4.  Beto sube sus cambios al servidor 10 minutos después.

**El Desastre:** Como Beto no tenía los cambios de Ana, al guardar su versión, **sobrescribió y borró** todo el trabajo de diseño que hizo Ana. El menú vuelve a estar roto. El equipo entra en conflicto.

**Reflexión:**
Responda a las siguientes preguntas en su bitácora o foro de discusión:
*   ¿Alguna vez le ha pasado que pierde un trabajo por no guardar una versión anterior?
*   ¿Cómo evitaríamos este desastre en el equipo de Ana y Beto sin usar memorias USB ni correos electrónicos?
*   ¿Por qué cree que es importante saber quién hizo qué cambio y cuándo?

### 3.2 Actividad de Contextualización: Git vs. GitHub

Para entender las herramientas, es vital no confundirlas. Complete el siguiente cuadro comparativo investigando en la web:

| Característica | Git | GitHub |
| :--- | :--- | :--- |
| **¿Qué es?** | Sistema de Control de Versiones Distribuido. | Plataforma de alojamiento de código en la nube. |
| **¿Dónde se ejecuta?** | Localmente (en su computador). | Remotamente (en la web/servidores). |
| **¿Necesita Internet?** | | |
| **Función principal** | | |
| **Comando/Acción clave** | `git commit` | `Pull Request` |

### 3.3 Actividad de Apropiación: Tutorial "Zero to Hero"

Realice las siguientes prácticas secuenciales en su entorno de desarrollo (Visual Studio Code + Git Bash).

#### Nivel 1: La Base (Ciclo de Vida Local)
Entenderemos los tres estados de Git: *Working Directory* (Trabajo), *Staging Area* (Preparación) y *Repository* (Historial).

1.  Cree una carpeta llamada `mi-primer-proyecto`.
2.  Abra la terminal en esa carpeta e inicie el repositorio:
    ```bash
    git init
    ```
3.  Cree un archivo `index.html`.
4.  Verifique el estado (Note que el archivo está en rojo/untracked):
    ```bash
    git status
    ```
5.  Pase el archivo al área de preparación (*Staging*):
    ```bash
    git add index.html
    ```
6.  Tome la "foto" o guarde la versión (*Commit*):
    ```bash
    git commit -m "Creación inicial del proyecto"
    ```

#### Nivel 2: La Nube (Conectando con GitHub)
El código en su PC corre riesgo si el disco duro falla. Vamos a la nube.

1.  Cree una cuenta en [GitHub.com](https://github.com/).
2.  **Seguridad:** Configure un *Personal Access Token* (Classic) o use la autenticación web al momento de hacer push, ya que GitHub no acepta contraseñas de correo por consola.
3.  Cree un **Nuevo Repositorio** en GitHub llamado `taller-git-sena`.
4.  Conecte su repositorio local con el de la nube:
    ```bash
    git remote add origin https://github.com/SU_USUARIO/taller-git-sena.git
    git branch -M main
    git push -u origin main
    ```

#### Nivel 3: Trabajo en Equipo - Ingeniería (Ramas/Branches)
**Regla de Oro:** NUNCA trabaje directamente sobre la rama `main`. La rama `main` es sagrada y solo debe tener código funcional.

1.  Cree una rama para una nueva funcionalidad:
    ```bash
    git checkout -b feature-login
    ```
2.  Modifique el archivo `index.html` agregando un formulario de login ficticio.
3.  Guarde los cambios en esta rama:
    ```bash
    git add .
    git commit -m "Agrega formulario de login"
    ```
4.  Vuelva a la rama principal (Verá que el código del login desaparece, ¡es la máquina del tiempo!):
    ```bash
    git checkout main
    ```
5.  Fusione los cambios (Traiga lo de la rama feature a main):
    ```bash
    git merge feature-login
    ```

#### Nivel 4: Experto - Colaboración Profesional
En equipos grandes, no hacemos `merge` directo. Usamos **Pull Requests (PR)** para revisión de código.

1.  Cree una nueva rama `feature-footer`.
2.  Haga cambios y haga `commit`.
3.  Suba la rama a GitHub (no a main):
    ```bash
    git push origin feature-footer
    ```
4.  Vaya a GitHub.com. Verá un botón verde "Compare & pull request".
5.  Cree el PR, asigne un revisor y simule la aprobación y fusión desde la interfaz web.

### 3.4 Actividad de Transferencia: Reto Colaborativo "Open Source Simulado"

**Instrucción:** Formen parejas (Aprendiz A y Aprendiz B).

1.  **Aprendiz A:** Crea un repositorio en GitHub llamado `proyecto-colaborativo`. Agrega a Aprendiz B como "Collaborator" en la configuración.
2.  **Aprendiz B:** Clona el repositorio en su máquina.
    ```bash
    git clone [URL_DEL_REPO]
    ```
3.  **Conflicto Intencional:**
    *   Ambos editan la **mismo línea** del mismo archivo al mismo tiempo en sus computadores locales.
    *   Aprendiz A hace `add`, `commit` y `push`.
    *   Aprendiz B hace `add`, `commit` e intenta hacer `push`.
4.  **Resolución:**
    *   Aprendiz B recibirá un error. Debe ejecutar `git pull`.
    *   Git indicará un **CONFLICTO**.
    *   Aprendiz B debe abrir el archivo, decidir qué código se queda (o combinar ambos), guardar, y finalizar el proceso:
    ```bash
    git add .
    git commit -m "Resolviendo conflicto de fusión"
    git push origin main
    ```

---

## 4. PLANTEAMIENTO DE EVIDENCIAS DE APRENDIZAJE

| Tipo de Evidencia | Descripción de la Evidencia | Criterios de Evaluación |
| :--- | :--- | :--- |
| **De Conocimiento** | **Cuestionario:** Estados de Git, comandos básicos y flujo de trabajo. | Identifica correctamente la diferencia entre `git add`, `git commit` y `git push`. |
| **De Desempeño** | **Observación Directa:** Ejecución de comandos en terminal durante el Reto Colaborativo. | Utiliza la consola de comandos (Git Bash) fluidamente. Resuelve conflictos de fusión sin perder código. |
| **De Producto** | **Repositorio en GitHub:** URL del repositorio del "Reto Colaborativo". | El repositorio contiene: <br>1. Historial de commits claro (Network Graph).<br>2. Archivo `README.md` con descripción del proyecto.<br>3. Evidencia de participación de ambos aprendices. |

---

## 5. GLOSARIO DE TÉRMINOS

*   **Repositorio (Repo):** El lugar donde se almacena el proyecto y su historial de versiones (puede ser local o remoto).
*   **Commit:** Es como tomar una "foto" del estado actual del proyecto. Es la unidad básica de guardado en Git.
*   **Branch (Rama):** Una línea de tiempo paralela. Permite trabajar en nuevas funciones sin afectar el código principal (`main`).
*   **Merge (Fusión):** Acción de unir dos ramas. Por ejemplo, integrar una funcionalidad nueva a la rama principal.
*   **Pull Request (PR):** Petición para fusionar cambios en un repositorio remoto. Permite la revisión de código antes de aceptar los cambios.
*   **Conflict (Conflicto):** Ocurre cuando dos personas modifican la misma parte de un archivo y Git no sabe cuál versión conservar automáticamente.
*   **Fork:** Una copia personal de un repositorio ajeno. Muy usado en Open Source.
*   **Clone:** Descargar una copia exacta de un repositorio remoto a tu máquina local.

---

## 6. REFERENCIAS BIBLIOGRÁFICAS

*   **Documentación Oficial de Git:** [https://git-scm.com/doc](https://git-scm.com/doc)
*   **GitHub Education:** [https://education.github.com/](https://education.github.com/)
*   **Pro Git Book (Scott Chacon):** Disponible gratuitamente en el sitio oficial de Git.

---
**Control del Documento**

| | Nombre | Cargo | Fecha |
| :--- | :--- | :--- | :--- |
| **Autor** | Instructor Área de Sistemas | Instructor SENA | Octubre 2023 |
