# pull official base image
FROM python:3.9.0-alpine
# set work directory
WORKDIR /usr/src/app

## set environment variables
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1
# install dependencies

RUN pip install --upgrade pip

RUN apk add --no-cache \
        libressl-dev \
        musl-dev \
        libffi-dev && \
    pip install --no-cache-dir cryptography==3.4.7 && \
    apk del \
        libressl-dev \
        musl-dev \
        libffi-dev


COPY ./reqDocker.txt .



RUN pip install -r reqDocker.txt
# copy project
COPY .. .



#FROM node:14.15.1-alpine3.11 as frontend
#WORKDIR /app
#COPY frontend .
#RUN npm install
#RUN npm run build
#
#
#FROM python:3.8.6-alpine3.11
#COPY Backend .
#COPY --from=frontend /app/dist /vue
#RUN pip install -r requirements.txt
#CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

#docker build -t showall .
#docker run -p1234:8000 showit
#docker images