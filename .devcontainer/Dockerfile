FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Utilisateur non-root déjà défini dans l'image de devcontainers
# (souvent node ou vscode, on vérifie plus bas)

# Redéfinit PNPM_HOME dans un dossier accessible
ENV PNPM_HOME=/home/node/.pnpm-store
ENV PATH=$PNPM_HOME:$PATH

# Active corepack et installe pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Crée le dossier PNPM_HOME avec les bonnes permissions
RUN mkdir -p $PNPM_HOME && chown -R node:node $PNPM_HOME

# Change d’utilisateur pour éviter les soucis de permission
USER node

# Installe Angular CLI globalement avec PNPM
RUN pnpm add -g @angular/cli

# Répertoire de travail
WORKDIR /workspaces/app

# Port exposé pour Angular
EXPOSE 4200

# Désactive les analytics Angular
ENV NG_CLI_ANALYTICS=false
