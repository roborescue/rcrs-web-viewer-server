function Entity(data){
    Object.assign(this, data);

    if('Id' in data){
        this.Id = parseInt(data.Id);
    }

    if('EntityName' in data){
        this.EntityName = data.EntityName.trim();
    }
}