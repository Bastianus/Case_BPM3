namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class antwoorduitdb : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.AntwoordCursus");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.AntwoordCursus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Startdatum = c.DateTime(nullable: false),
                        Duur = c.Int(nullable: false),
                        Naam = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
