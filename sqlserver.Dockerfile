FROM mcr.microsoft.com/mssql/server:2022-latest

USER root

# Instala ferramentas compatíveis com Ubuntu 22.04
RUN apt-get update && \
  apt-get install -y curl gnupg apt-transport-https software-properties-common && \
  curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
  add-apt-repository "$(curl -s https://packages.microsoft.com/config/ubuntu/22.04/prod.list)" && \
  apt-get update && \
  ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev && \
  ln -sfn /opt/mssql-tools/bin/sqlcmd /usr/bin/sqlcmd

ENV PATH="${PATH}:/opt/mssql-tools/bin"

USER mssql
