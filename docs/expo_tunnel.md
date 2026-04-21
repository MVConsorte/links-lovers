# Guia de Configuração: Expo Tunnel

Este documento detalha o processo de configuração do modo Tunnel no React Native utilizando Expo. Esta configuração é recomendada para desenvolvedores que enfrentam problemas de conectividade em redes locais (LAN), bloqueios de firewall ou quando o dispositivo móvel e o computador não conseguem se comunicar diretamente.

## 1. Conceito de Funcionamento

O modo Tunnel utiliza o serviço Ngrok para criar uma URL pública temporária. Esta URL roteia o tráfego da internet para o servidor local do Metro Bundler em seu computador. Isso elimina a necessidade de o computador e o celular estarem na mesma sub-rede ou de configurar regras complexas de entrada no Firewall do Windows.

## 2. Pré-requisitos

* Projeto React Native com Expo configurado.
* Aplicativo Expo Go instalado no dispositivo móvel (iOS ou Android).
* Node.js e npm/yarn instalados no sistema operacional.

## 3. Configuração da Conta Ngrok

O Ngrok exige autenticação para permitir a criação de túneis estáveis. Sem um token de autenticação, o serviço pode apresentar erros de conexão imediata.

1.  Acesse o site oficial: https://ngrok.com/
2.  Crie uma conta gratuita.
3os. No painel de controle (Dashboard), acesse a seção "Your Authtoken".
4.  Copie o token gerado pelo sistema. (local: https://dashboard.ngrok.com/get-started/setup/windows)

## 4. Autenticação no Ambiente de Desenvolvimento

Abra o terminal (PowerShell ou Prompt de Comando ou Bash) e execute o comando abaixo para registrar o seu token no arquivo de configuração global do Ngrok em seu computador:

```bash
npx ngrok config add-authtoken SEU_TOKEN_AQUI
```

## 5. Execução do Projeto

Para iniciar o projeto utilizando o túnel, utilize a flag `--tunnel`. É recomendável utilizar também a flag `-c` para limpar o cache do Metro Bundler, garantindo que as configurações de rede sejam atualizadas.

```bash
npx expo start -c --tunnel
```

Na primeira execução, o terminal poderá solicitar a instalação do pacote `@expo/ngrok`. Confirme a instalação para prosseguir.

## 6. Uso Simultâneo com Emuladores

O modo Tunnel permite a conexão de múltiplos dispositivos simultaneamente:
* **Dispositivo Físico:** Escaneie o QR Code gerado no terminal ou no navegador.
* **Emulador Android:** Com o servidor rodando e o emulador aberto, pressione a tecla "a" no terminal.
* **Simulador iOS (apenas macOS):** Pressione a tecla "i" no terminal.

## 7. Resolução de Problemas

### Erro: remote gone away
Este erro ocorre quando o processo do Ngrok é encerrado por interferência externa ou falta de autenticação.
* Verifique se o Authtoken foi configurado corretamente conforme o Passo 4.
* Encerre processos fantasmas do Ngrok no Windows com o comando: `taskkill /f /im ngrok.exe`.

### Erro: Network response timed out
Mesmo no modo Tunnel, o Firewall do Windows pode bloquear a saída de dados do Node.js.
* Certifique-se de que o binário do Node.js possui permissões de comunicação em redes Privadas e Públicas nas configurações de Firewall do Windows.

### Lentidão no Carregamento
O carregamento inicial (JavaScript Bundle) pode ser mais lento em comparação ao modo LAN, pois os dados trafegam por servidores externos. Uma vez carregado, as atualizações rápidas (Fast Refresh) funcionam normalmente.

### Erro: "failed to start tunnel" ou "failed to connect to tunnel"

Nesse caso, o problema pode estar vinculado ao cache do Bundler. Para resolver, geralmente limpá-lo resolve. execute o comando abaixo para limpar o cache do Metro Bundler:

```bash
npx expo start --clear --tunnel
```

## Emuladores em simultâneo

No caso de estar utilizando emuladores, ocorre que é necessário ajustar a rede do emulador para acessar o túnel. Para isso, ajuste a configuração manualmente da rede do emulador seguindo as instruções abaixo:

1. No emulador, abra o app **Settings** (Configurações) > **Network & internet** > **Internet**.
2. Clique na **engrenagem** ao lado da rede "AndroidWifi" e depois no **lápis** (Editar) no topo da tela.
3. Clique em **Advanced options** (Opções avançadas).
4. Mude a opção "IP settings" de DHCP para **Static** (Estático).
5. Preencha exatamente com estes valores:
   * **IP address:** `10.0.2.15`
   * **Gateway:** `10.0.2.2` *(Esse é o IP mágico que conecta o emulador ao seu Windows)*
   * **Network prefix length:** `24`
   * **DNS 1:** `8.8.8.8`
   * **DNS 2:** `8.8.4.4`
6. Clique em **Save**, desligue o Wi-Fi do emulador, ligue novamente e teste o Chrome.

## Links auxiliares
* [Documentação oficial do Expo sobre o modo Tunnel](https://docs.expo.dev/workflow/expo-cli/#expo-start--tunnel)
* [Guia de Configuração: Expo Tunnel](https://dghostninja.github.io/posts/React-Native/expo-tunnel/)