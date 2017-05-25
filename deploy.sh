cd /usr/local/source/distss
rm -rf dist
unzip app.zip
rm -rf /usr/local/source/crm/app
cp -r dist/ /usr/local/source/crm/app

rm -rf app.zip
rm -rf dist