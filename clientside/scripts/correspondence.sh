#!/bin/bash

###
# Functions

f_copy_file () {
    local src=$1
    local des=$2

    echo "Copy $src --> $des"
    cp $src $des
}


d_copy_directory () {
    local src=$1
    local des=$2

    echo "Copy $src/* --> $des"
    cp $src/* $des
}


###
# Set cor. file ($input_file)

while getopts f: flag
do
    case "${flag}" in
        f) arg_f=${OPTARG};;
    esac
done

if [ -z "$arg_f" ]
then
    input_file="./correspondences.txt"
else
    input_file=$arg_f
fi


###
# Read file

file_content=$(cat $input_file)
cleaned_content=$(echo "$file_content" | sed "s/#.*$//;/^ *$/d" -)

lines=()
while IFS= read -r line; do
    lines+=( $(echo $line | xargs) ) 
done <<< "$cleaned_content"


###
# Process lines

for line in ${lines[@]}; do
    IFS=':' read -ra LC <<< "$line"
    
    mode=${LC[0]}
    src=${LC[1]}
    des=${LC[2]}
    
    case $mode in
        f)
            f_copy_file $src $des
            ;;
        d)
            d_copy_directory $src $des
            ;;
    esac
done

