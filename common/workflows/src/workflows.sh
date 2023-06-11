# read the workflow template
WORKFLOW_TEMPLATE=$(cat .github/workflow-template.yml)
WORKFLOW_TEMPLATE_MOBILE=$(cat .github/workflow-template-mobile.yml)

# iterate each route in routes directory
ROUTES=("fronts" "backends");
PROJECTS=("mybank");
for PROJECT in ${PROJECTS[@]}; do
    for WORKSPACE in ${ROUTES[@]}; do
        for ROUTE in $(ls ${WORKSPACE}); do
            if test -f "$WORKSPACE/$ROUTE/Dockerfile"; then
                echo "generating workflow for ${WORKSPACE}/${ROUTE}"
                # replace template route placeholder with route name
                WORKFLOW=$(echo "${WORKFLOW_TEMPLATE}" | \
                    sed "s/{{NAME_ROUTE}}/${WORKSPACE::-1}-${ROUTE}/g" | \
                    sed "s/{{LOCATION}}/${WORKSPACE}\/${ROUTE}/g")
                # save workflow to .github/workflows/{ROUTE}
                echo "${WORKFLOW}" > .github/workflows/${WORKSPACE::-1}-${ROUTE}.yml
            fi
            if test -f "$WORKSPACE/$ROUTE/capacitor.config.json"; then
                echo "generating workflow mobile for ${WORKSPACE}/${ROUTE}"
                # replace template route placeholder with route name
                WORKFLOW=$(echo "${WORKFLOW_TEMPLATE_MOBILE}" | \
                    sed "s/{{NAME_ROUTE}}/${WORKSPACE::-1}-${ROUTE}/g" | \
                    sed "s/{{LOCATION}}/${WORKSPACE}\/${ROUTE}/g")
                # save workflow to .github/workflows/{ROUTE}
                echo "${WORKFLOW}" > .github/workflows/${WORKSPACE::-1}-${ROUTE}-mobile.yml
            fi
        done
    done
done
