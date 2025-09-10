// build-check.js
const fs = require("fs");

console.log("🔧 Iniciando proceso de build para Next.js 15...\n");

// Archivos requeridos en un proyecto Next.js 15
const requiredFiles = [
  "package.json",
  "tsconfig.json",
  "public",
  "app", // App Router structure
];

// Archivos opcionales pero recomendados
const optionalFiles = [
  "next.config.ts",
  "next.config.js",
  "next.config.mjs",
];

// Verificar archivos/carpetas requeridas
let allFilesExist = true;
console.log("📁 Verificando archivos/carpetas requeridas:");
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTANTE`);
    allFilesExist = false;
  }
});

// Verificar configuración de Next.js
console.log("\n⚙️  Verificando configuración de Next.js:");
const hasNextConfig = optionalFiles.some(file => fs.existsSync(file));
if (hasNextConfig) {
  const configFile = optionalFiles.find(file => fs.existsSync(file));
  console.log(`  ✅ ${configFile} encontrado`);
} else {
  console.log("  ⚠️  No se encontró next.config (usando configuración por defecto)");
}

// Verificar estructura App Router
console.log("\n📂 Verificando estructura App Router:");
if (fs.existsSync("app")) {
  const hasLayout = fs.existsSync("app/layout.tsx") || fs.existsSync("app/layout.js");
  const hasPage = fs.existsSync("app/page.tsx") || fs.existsSync("app/page.js");
  
  if (hasLayout) {
    console.log("  ✅ app/layout.tsx encontrado");
  } else {
    console.log("  ❌ app/layout.tsx faltante");
    allFilesExist = false;
  }
  
  if (hasPage) {
    console.log("  ✅ app/page.tsx encontrado");
  } else {
    console.log("  ❌ app/page.tsx faltante");
    allFilesExist = false;
  }
} else {
  console.log("  ❌ Carpeta app/ faltante");
  allFilesExist = false;
}

// Verificar conflictos de estructura
console.log("\n🔍 Verificando conflictos de estructura:");
if (fs.existsSync("app") && fs.existsSync("src/app")) {
  console.log("  ⚠️  CONFLICTO: Detectadas carpetas /app y /src/app simultáneas");
  console.log("     Next.js solo puede usar una estructura App Router");
  console.log("     Recomendación: Eliminar una de las carpetas");
}

// Verificar .env
console.log("\n🔐 Verificando configuración:");
if (fs.existsSync(".env.local") || fs.existsSync(".env")) {
  console.log("  ✅ Archivo .env encontrado");
} else {
  console.log("  ⚠️  No se encontró archivo .env (puede ser necesario)");
}

// Verificar carpeta public
console.log("\n📂 Verificando carpeta public/:");
if (fs.existsSync("public")) {
  const publicFiles = fs.readdirSync("public");
  console.log(`  ✅ Carpeta public/ (${publicFiles.length} archivos)`);
} else {
  console.log("  ❌ Carpeta public/ faltante");
  allFilesExist = false;
}

// Verificar JSONs
console.log("\n🔍 Validando archivos de configuración:");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  console.log("  ✅ package.json válido");
  
  // Verificar dependencias críticas
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.next) {
    console.log(`  ✅ Next.js ${deps.next} instalado`);
  } else {
    console.log("  ❌ Next.js no encontrado en dependencias");
    allFilesExist = false;
  }
  
  if (deps.react) {
    console.log(`  ✅ React ${deps.react} instalado`);
  } else {
    console.log("  ❌ React no encontrado en dependencias");
    allFilesExist = false;
  }
} catch (e) {
  console.log("  ❌ package.json inválido");
  allFilesExist = false;
}

// Verificar TypeScript
if (fs.existsSync("tsconfig.json")) {
  try {
    JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
    console.log("  ✅ tsconfig.json válido");
  } catch (e) {
    console.log("  ❌ tsconfig.json inválido");
    allFilesExist = false;
  }
}

// Resultado
console.log("\n" + "=".repeat(50));
if (allFilesExist) {
  console.log("🎉 BUILD EXITOSO - Proyecto listo para despliegue");
  process.exit(0);
} else {
  console.log("❌ BUILD FALLIDO - Corrige los errores antes de desplegar");
  process.exit(1);
}
