<?php

class Category
{
    public $category_aid;
    public $category_is_active;
    public $category_name;
    public $category_description;
    public $category_created;
    public $category_updated;

    public $connection;
    public $lastInsertedId;

    public $start;
    public $total;
    public $search;
    public $tblSettingsCategory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsCategory = "settings_category";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsCategory}";
            $sql .= " ( ";
            $sql .= " category_is_active, ";
            $sql .= " category_name, ";
            $sql .= " category_description, ";
            $sql .= " category_created, ";
            $sql .= " category_updated ";
            $sql .= ") values (";
            $sql .= " :category_is_active, ";
            $sql .= " :category_name, ";
            $sql .= " :category_description, ";
            $sql .= " :category_created, ";
            $sql .= " :category_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_created" => $this->category_created,
                "category_updated" => $this->category_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

public function readAll(){
        try{
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsCategory} ";
            
            // This acts as a safe base for the 'and' conditions below
            $sql .= " where 1=1 "; 
            
            // FILTER
            $sql .= $this->category_is_active != '' ? " and category_is_active = :category_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " category_name like :category_name  " : " ";
            $sql .= $this->search != '' ? " or category_description like :category_description  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->category_is_active != '' ? ["category_is_active" => $this->category_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "category_name" => "%{$this->search}%",
                    "category_description" => "%{$this->search}%",
                ] : [],
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function readLimit(){
        try{
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsCategory} ";
            
            $sql .= " where 1=1 ";
            
            // FILTER
            $sql .= $this->category_is_active != '' ? " and category_is_active = :category_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " category_name like :category_name  " : " ";
            $sql .= $this->search != '' ? " or category_description like :category_description  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            // THIS IS FOR PAGINATION LIKE FACEBOOK SCROLLING
            $sql .= "limit :start, ";
            $sql .= " :total ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->category_is_active != '' ? ["category_is_active" => $this->category_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "category_name" => "%{$this->search}%",
                    "category_description" => "%{$this->search}%",
                ] : [],
                "start" => $this->start - 1,
                "total" => $this->total,
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql =" update {$this->tblSettingsCategory} set ";
            $sql .= " category_name = :category_name, ";
            $sql .= " category_description = :category_description, ";
            $sql .= " category_updated = :category_updated ";
            $sql .= " where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_updated" => $this->category_updated,
                "category_aid" => $this->category_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); turn on when debugging
            $query = false;
        } return $query;
    }

    public function active(){
        try{
            $sql =" update {$this->tblSettingsCategory} set ";
            $sql .= " category_is_active = :category_is_active, "; 
            $sql .= " category_updated = :category_updated ";
            $sql .= " where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_updated" => $this->category_updated,
                "category_aid" => $this->category_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function delete(){
        try{
            $sql =" delete from {$this->tblSettingsCategory} ";
            $sql .= " where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_aid" => $this->category_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function checkName(){
        try{
            $sql = "select ";
            $sql .= " category_name ";
            $sql .= " from {$this->tblSettingsCategory} ";
            $sql .= " where category_name = :category_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }
}