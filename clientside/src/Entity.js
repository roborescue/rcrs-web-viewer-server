function Entity(data){
    Object.assign(this, data);

    if('Id' in data){
        this.Id = parseInt(data.Id);
    }

    if('EntityName' in data){
        this.EntityName = data.EntityName.trim();
    }

    if('HP' in data){
        this.HP = parseInt(data.HP);
    }

    if('Fieryness' in data){
        this.Fieryness = parseInt(data.Fieryness);
    }
}