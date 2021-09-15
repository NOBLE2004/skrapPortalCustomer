# Set the base image to node:12-alpine
FROM node:14-alpine as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

RUN apk add g++ gcc libgcc libstdc++ linux-headers make python --quiet

# Prepare the container for building React
# RUN npm install
RUN yarn && yarn build

# Prepare nginx
FROM nginx:1.19.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
