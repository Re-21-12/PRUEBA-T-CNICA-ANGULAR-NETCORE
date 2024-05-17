using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Pruebatecnica.Models
{
    public partial class prueba_tecnicaContext : DbContext
    {
        public prueba_tecnicaContext()
        {
        }

        public prueba_tecnicaContext(DbContextOptions<prueba_tecnicaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Campo> Campos { get; set; } = null!;
        public virtual DbSet<CampoEnFormulario> CampoEnFormularios { get; set; } = null!;
        public virtual DbSet<Formulario> Formularios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=VICTOR;database=prueba_tecnica;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Campo>(entity =>
            {
                entity.ToTable("campo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Esrequerido)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("esrequerido")
                    .IsFixedLength();

                entity.Property(e => e.LinkFormulario)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasColumnName("link_formulario");

                entity.Property(e => e.NombreCampo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre_campo");

                entity.Property(e => e.TipoCampo)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("tipo_campo");

                entity.Property(e => e.TituloCampo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("titulo_campo");
            });

            modelBuilder.Entity<CampoEnFormulario>(entity =>
            {
                entity.ToTable("campo_en_formulario");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdCampo).HasColumnName("id_campo");

                entity.Property(e => e.LinkFormulario)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasColumnName("link_formulario");

                entity.Property(e => e.Valor)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasColumnName("valor");

                entity.HasOne(d => d.IdCampoNavigation)
                    .WithMany(p => p.CampoEnFormularios)
                    .HasForeignKey(d => d.IdCampo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__campo_en___id_ca__59063A47");

                entity.HasOne(d => d.LinkFormularioNavigation)
                    .WithMany(p => p.CampoEnFormularios)
                    .HasForeignKey(d => d.LinkFormulario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__campo_en___link___5812160E");
            });

            modelBuilder.Entity<Formulario>(entity =>
            {
                entity.HasKey(e => e.LinkFormulario)
                    .HasName("PK__formular__82BB6EE99EE103A8");

                entity.ToTable("formulario");

                entity.Property(e => e.LinkFormulario)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasColumnName("link_formulario");

                entity.Property(e => e.DescripcionEncuesta)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("descripcion_encuesta");

                entity.Property(e => e.NombreEncuesta)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre_encuesta");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
