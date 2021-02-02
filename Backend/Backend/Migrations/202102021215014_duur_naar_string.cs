namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class duur_naar_string : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Cursus", "Duur", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Cursus", "Duur", c => c.Int(nullable: false));
        }
    }
}
