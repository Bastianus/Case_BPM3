namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class seed_added : DbMigration
    {
        public override void Up()
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
            
            CreateTable(
                "dbo.CursusInstanties",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Startdatum = c.DateTime(nullable: false),
                        CursusId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cursus", t => t.CursusId, cascadeDelete: true)
                .Index(t => t.CursusId);
            
            CreateTable(
                "dbo.Cursus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Naam = c.String(),
                        Duur = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CursusInstanties", "CursusId", "dbo.Cursus");
            DropIndex("dbo.CursusInstanties", new[] { "CursusId" });
            DropTable("dbo.Cursus");
            DropTable("dbo.CursusInstanties");
            DropTable("dbo.AntwoordCursus");
        }
    }
}
