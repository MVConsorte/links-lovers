# Problemas no Babel e como resolver

## Resolvendo o erro do Babel (`@babel/preset-env`)

Esse erro indica que o compilador de JavaScript (Babel) está tentando usar um "preset" que não foi instalado ou não está no seu `node_modules`. Isso acontece muito se a instalação inicial foi interrompida ou se houve algum conflito de cache.

**A solução "Nuclear" (A que resolve 99% das vezes):**
Abra o terminal na pasta do seu projeto e execute os seguintes comandos em ordem:

1. **Remova a pasta de módulos e o arquivo de trava:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   ```
   *(No Windows/PowerShell, use `rmdir /s /q node_modules` e `del package-lock.json`)*

2. **Limpe o cache do NPM/Yarn:**
   ```bash
   npm cache clean --force
   ```

3. **Instale as dependências novamente:**
   ```bash
   npm install
   ```

4. **Instale explicitamente o preset que está faltando (por garantia):**
   ```bash
   npm install @babel/preset-env --save-dev
   ```

---

### Limpando o Cache do Metro Bundler

Depois de arrumar os arquivos e as dependências, o "servidor" do React Native (Metro) pode ainda estar tentando ler arquivos antigos do cache. 

**Para rodar o projeto do zero limpando tudo:**

```bash
npx expo start -c
```
*(O `-c` serve para dar um **Clear Cache** no Metro Bundler).*