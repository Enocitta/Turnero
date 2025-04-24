#!/usr/bin/env python3
import os
import subprocess
import venv
import sys
import shutil

def shell_source(script):
    """Emula 'source' de bash."""
    pipe = subprocess.Popen(f". {script} && env -0", stdout=subprocess.PIPE, shell=True)
    output = pipe.communicate()[0].decode('utf-8').strip('\0')
    env = dict(line.split('=', 1) for line in output.split('\0') if '=' in line)
    os.environ.update(env)

patch_now = subprocess.run("pwd", capture_output=True, text=True).stdout.strip()
venv_path = os.path.join(patch_now, ".venv")

try:
    venv_builder = venv.EnvBuilder(with_pip=True)
    venv_builder.create(venv_path)

    activate_script = os.path.join(venv_path, "bin", "activate")
    subprocess.run(["chmod", "a+x", activate_script], check=True)

    shell_source(activate_script)

    #  CORRECCIÓN IMPORTANTE: Usa el python del entorno virtual
    pip_executable = os.path.join(venv_path, "bin", "pip")
    result = subprocess.run(
        [pip_executable, "install", "-r", "requirements.txt"],
        capture_output=True,
        text=True,
    )

    if result.stdout:
        print("--- pip stdout ---")
        print(result.stdout)
    if result.stderr:
        print("--- pip stderr ---")
        print(result.stderr)

    if result.returncode != 0:
        raise subprocess.CalledProcessError(
            result.returncode, result.args, output=result.stdout, stderr=result.stderr
        )


except subprocess.CalledProcessError as e:
    print(f"Error al ejecutar un comando: {e}")
    if os.path.exists(venv_path):
        shutil.rmtree(venv_path)
    sys.exit(1)
except Exception as e:
    print(f"Ocurrió un error inesperado: {e}")
    if os.path.exists(venv_path):
        shutil.rmtree(venv_path)
    sys.exit(1)