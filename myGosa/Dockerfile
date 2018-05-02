# 어떤 이미지를 사용해서 빌드할 것인지를 정의 
FROM node:carbon

# Dockerfile을 생성 / 관리하는 사람
MAINTAINER Yongho Kim <silqwer@gmail.com>

# 애플리케이션의 워킹 디렉토리 설정 
WORKDIR /home/tekville/dkApps/myGosa

# 애플리케이션 의존성 설치 
COPY package*.json ./
RUN npm install

# 도커 이미지 안에 애플리케이션의 소스코드를 넣기
COPY ..

# 애플리케이션이 8080포트에 바인딩 되어 있으므로 오커 데몬에 매핑
EXPOSE 9080

# 애플리케이션을 실행하는 중요 명령어 정의 
CMD ["npm", "start"] 